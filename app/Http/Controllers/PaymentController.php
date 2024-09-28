<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessCheckouts;
use App\Models\Category;
use App\Models\Checkout;
use App\Models\Cuisine;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Stripe\StripeClient;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        $stripe = new StripeClient(config('services.stripe.secret', ''));
        $app_domain = config('app.url', 'https://kingsflavour.com');

        // TODO!: validate we have pids
        $pids = $request->input('pids', '');
        $price_ids = [];
        foreach ($pids as $pid) {
            $price_ids[] = [
                'price' => $pid,
                'quantity' => 1,
            ];
        }

        try {
            $checkout_session = $stripe->checkout->sessions->create([
                'line_items' => $price_ids,
                'mode' => 'payment',
                'success_url' => $app_domain . '/post-checkout?state=1&sess={CHECKOUT_SESSION_ID}',
                'cancel_url' => $app_domain . '/post-checkout?state=0&sess={CHECKOUT_SESSION_ID}',
               'phone_number_collection' => ['enabled' => true],
                'shipping_address_collection' => ['allowed_countries' => ['GB']]
            ]);

            return response()->json(['url' => $checkout_session->url]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['msg' => 'failed to create a session'], 500);
        }
    }

    public function postcheckout(Request $request)
    {
        $cuisines = Cuisine::all();
        $categories = Category::all();

        $state = $request->input('state', 0);
        $sess_id = $request->input('sess', 0);

        if ($state == 0) {
            return Inertia::render('PostcheckoutCancel', [
                'cuisines' => $cuisines, 'categories' => $categories
            ]);
        }

        $stripe = new StripeClient(config('services.stripe.secret', ''));
        $session = $stripe->checkout->sessions->retrieve($sess_id);

        return Inertia::render('PostcheckoutSuccess', [
            'cuisines' => $cuisines, 'categories' => $categories, 'details' => $session['customer_details']
        ]);
    }

    public function order(Request $request)
    {
        $body = $request->getContent();
        $server_signature = $request->header('Stripe-Signature');
        $endpoint_secret = config('services.stripe.endpoint_key', 'endpoint_secret not found');
        $stripe_key = config('services.stripe.secret', 'stripe_secret');

        try {
            $event = \Stripe\Webhook::constructEvent($body, $server_signature, $endpoint_secret);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return \response()->json(['msg' => 'failed to create an event'], 500);
        }

        if ($event->type !== 'checkout.session.completed') {
            return \response()->json(['msg' => 'unknown event'], 500);
        }

        $session_id = $event->data->object->id;
        $stripe = new StripeClient($stripe_key);
        $session = $stripe->checkout->sessions->retrieve($session_id);

        if ($session->payment_status === 'unpaid') {
            return \response()->json(['msg' => 'failed to pay'], 500);
        }

        $checkout = Checkout::firstOrCreate([
          'session_id' => $session_id
        ]);
        ProcessCheckouts::dispatchAfterResponse($checkout);

        return \response()->json(['msg' => 'ok']);
    }
}
