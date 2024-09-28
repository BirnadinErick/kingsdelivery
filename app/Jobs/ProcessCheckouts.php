<?php

namespace App\Jobs;

use App\Mail\OrderConfirmed;
use App\Models\Checkout;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Variation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;

class ProcessCheckouts implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Checkout $checkout)
    {
    }

    /**
     * Execute the job.
     * @throws ApiErrorException
     */
    public function handle(): void
    {
        $order_total_pences = 0;
        $mail_orders = [];

        $stripe = new StripeClient(config('services.stripe.secret', ''));
        $session = $stripe->checkout->sessions->retrieve($this->checkout->session_id);
        $line_items = $stripe->checkout->sessions->allLineItems($this->checkout->session_id);

        $items = [];
        foreach ($line_items['data'] as $i) {
            $var = Variation::where('price_id', $i->price->id)->first();

            $cuisine = $var->cuisine_id;
            if (!isset($items[$cuisine])) {
                $items[$cuisine] = [
                    'orders' => [],
                    'time_to_prep' => 0,
                    'tot_price' => 0,
                    'eta' => 0
                ];
            }

            // construct the metadata
            $items[$cuisine]['orders'][] = $i->price->id;
            $items[$cuisine]['time_to_prep'] += $var->time_to_prep;
            $items[$cuisine]['tot_price'] += $i->amount_total;

            //prep mailing data
            $mail_orders[] = [
                'name' => $var->product->name . ' (' . $var->label . ')',
                'cuisine' => $var->cuisine->name,
                'price' => number_format($var->price, 2, '.', ',')
            ];
        }

        // cap ETA to 30 minutes (or +8 minutes fro delivery)
        $ETA_CAP = 30 * 60;
        foreach ($items as $_ => &$cuisine_obj) {
            $cuisine_obj['eta'] = min($ETA_CAP, $cuisine_obj['time_to_prep'] + (8 * 60));
        }

        //create a customer
        $customer = [
            'email' => $session->customer_details->email,
            'phone' => $session->customer_details->phone,
            'name' => $session->customer_details->name,
            'address' => json_encode($session->shipping_details->address),
            'age' => 0,
            'coords' => Customer::geocodeAddress($session->shipping_details->address)
        ];
        $customer = Customer::firstOrCreate($customer);
        Log::debug('customer created ' . $customer->customer_id);

        foreach ($items as $cuisine_id => $order_metadata) {
           $order = [
                'cuisine_id' => $cuisine_id,
                'customer_id' => $customer->customer_id,
                'stripe_session_id' => $this->checkout->session_id,
                'time_to_prep' => $order_metadata['time_to_prep'],
                'tot_price' => $order_metadata['tot_price'],
                'eta' => $order_metadata['eta'],
                'items' => implode(',', $order_metadata['orders'])
            ];
            $order = Order::firstOrCreate($order);
            $order->refresh();

            Log::debug('order created ' . $order->order_id);

            //prep mailing data
            $order_total_pences += $order['tot_price'];
        }

        Mail::to($customer->email)->send(new OrderConfirmed($customer->name, number_format(($order_total_pences / 100), 2, '.', ','), $mail_orders));
    }
}
