<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'age', 'phone', 'address', 'coords'];
    protected $primaryKey = 'customer_id';

    public static function geocodeAddress($address): ?string
    {
        $apiKey = config('services.google_api.geocoding', '');
        $formattedAddress = urlencode("{$address['line1']},{$address['line2']},{$address['postal_code']},{$address['city']},{$address['country']}");

        $url = "https://maps.googleapis.com/maps/api/geocode/json?address={$formattedAddress}&key={$apiKey}";
        $response = Http::get($url);

        if ($response->successful() && isset($response['results'][0])) {
            $location = $response['results'][0]['geometry']['location'];
            return $location['lat'] . "," . $location['lng'];
        }

        return null;
    }
}
