<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\Driver;
use App\Models\Order;
use App\Models\Variation;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function delivery_request(Request $request, $delivery_id)
    {
        $user = Auth::user();
        $driver = Driver::where('user_id', $user->getKey())->first();
        $checkout = Checkout::find((int)$delivery_id);

        //TODO check if the driver is available and redirect to ongoing delivery
        // else, assign the driver
        $checkout->driver_id = $driver->id;
        $checkout->save();

        $checkout->refresh();

        $orders = Order::with('cuisine')->with('customer')->where('stripe_session_id', $checkout->session_id)->get();

        $delivery = [
            'id' => $delivery_id,
        ];

        //calc deadline
        $tot_prep_time = array_sum($orders->map(function (Order $o) {
            return $o->time_to_prep;
        })->all());
        $deadline = Carbon::parse($checkout->created_at)->addSeconds($tot_prep_time)->format('H:i (d M Y)');
        $delivery['deadline'] = $deadline;

        //calc stops
        foreach ($orders as $o) {
            [$lat, $lng] = explode(',', $o->cuisine->address);
            $data = [
                'name' => $o->cuisine->name,
                'order_id' => $o->order_id,
                'items' => [],
                'location' => ['lat' => $lat, 'lng' => $lng]
            ];

            $items = explode(',', $o->items);
            $items = array_map(function (string $i) {
                return Variation::with('product')->where('price_id', $i)->first();
            }, $items);

            foreach ($items as $i) {
                $data['items'][] = [
                    'name' => $i->product->name,
                    'label' => $i->label
                ];
            }

            $delivery['stops'][] = $data;
        }

        //construct customer
        [$lat, $lng] = explode(',', $orders[0]->customer->coords);
        $delivery['customer'] = [
            'name' => $orders[0]->customer->name,
            'telephone' => $orders[0]->customer->phone,
            'coords' => ['lat' => $lat, 'lng' => $lng],
            'address' => $orders[0]->customer->address
        ];

        return Inertia::render('DriverRequest', ['delivery' => $delivery]);
    }

    public function deliver(Request $request)
    {
        $user = Auth::user();
        $driver = Driver::where('user_id', $user->getKey())->first();

        //TODO check if the driver is available and redirect to ongoing delivery

        $checkouts = Checkout::whereNull('driver_id')->get();
        $deliveries = [];
        foreach ($checkouts as $c) {
            $orders = Order::with('cuisine')->with('customer')->where('stripe_session_id', $c->session_id)->get();
            $d = [
                'id' => $c->id,
                'stops' => [],
                'address_text' => $orders[0]->customer->address
            ];

            foreach ($orders as $o) {
                $d['stops'][] = [
                    'name' => $o->cuisine->name,
                    'order_id' => $o->order_id
                ];
            }

            $deliveries[] = $d;
        }

        \Log::debug(var_export($deliveries, true));
        return Inertia::render('DriverDeliver', ['deliveries' => $deliveries]);
    }
}
