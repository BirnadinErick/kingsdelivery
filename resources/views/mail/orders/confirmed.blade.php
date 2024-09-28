<x-mail::message>
# Order Confirmation

Thanks {{$name}} for ordering from {{config('app.name')}}

<x-mail::table>
| Name       | From         | Price       |
| ------------- | ----------- | ------------: |
@foreach($orders as $order)
| {{$order['name']}} | {{$order['cuisine']}} | {{$order['price']}} |
@endforeach
</x-mail::table>

<x-mail::panel>
Your order total is {{$total}}
</x-mail::panel>


Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
