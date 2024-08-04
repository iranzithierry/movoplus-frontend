import { stripe } from '@/lib/stripe';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import Stripe from 'stripe';

interface CheckoutPageProps {
  searchParams: {
    action: 'cancel' | 'result',
    session_id: string
  }
}

async function getActionFromParams(searchParams: CheckoutPageProps['searchParams']) {
  if(searchParams.action === 'cancel')
    redirect('/marketplace')
  if (!searchParams.session_id)
    notFound()

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });
  console.log("checkoutSession:", checkoutSession);
  return checkoutSession;
}

/**
{
  "id": "cs_test_b1A0TndrGrUmsQn56yagBwsSuXNemWCsnKpI2hd2ka7kfAMZ63p19tueiD",
  "object": "checkout.session",
  "after_expiration": null,
  "allow_promotion_codes": null,
  "amount_subtotal": 31000,
  "amount_total": 31000,
  "automatic_tax": {
    "enabled": false,
    "liability": null,
    "status": null
  },
  "billing_address_collection": null,
  "cancel_url": "http://localhost:3000/checkout?action=cancel",
  "client_reference_id": null,
  "client_secret": null,
  "consent": null,
  "consent_collection": null,
  "created": 1722456093,
  "currency": "rwf",
  "currency_conversion": null,
  "custom_fields": [],
  "custom_text": {
    "after_submit": null,
    "shipping_address": null,
    "submit": null,
    "terms_of_service_acceptance": null
  },
  "customer": null,
  "customer_creation": "if_required",
  "customer_details": {
    "address": {
      "city": null,
      "country": "RW",
      "line1": null,
      "line2": null,
      "postal_code": null,
      "state": null
    },
    "email": "jadigegym@mailinator.com",
    "name": "Uma Stephenson",
    "phone": null,
    "tax_exempt": "none",
    "tax_ids": []
  },
  "customer_email": null,
  "expires_at": 1722542493,
  "invoice": null,
  "invoice_creation": {
    "enabled": false,
    "invoice_data": {
      "account_tax_ids": null,
      "custom_fields": null,
      "description": null,
      "footer": null,
      "issuer": null,
      "metadata": {},
      "rendering_options": null
    }
  },
  "line_items": {
    "object": "list",
    "data": [
      {
        "id": "li_1PiiiHKcvIzMIfahZNbKU7XO",
        "object": "item",
        "amount_discount": 0,
        "amount_subtotal": 16000,
        "amount_tax": 0,
        "amount_total": 16000,
        "currency": "rwf",
        "description": "Sky Crocs",
        "price": {
          "id": "price_1PiiiHKcvIzMIfah0BcntzMb",
          "object": "price",
          "active": false,
          "billing_scheme": "per_unit",
          "created": 1722456093,
          "currency": "rwf",
          "custom_unit_amount": null,
          "livemode": false,
          "lookup_key": null,
          "metadata": {},
          "nickname": null,
          "product": "prod_QZsBMYTdHcX8R1",
          "recurring": null,
          "tax_behavior": "unspecified",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "one_time",
          "unit_amount": 16000,
          "unit_amount_decimal": "16000"
        },
        "quantity": 1
      },
      {
        "id": "li_1PiiiHKcvIzMIfahafc4OxyT",
        "object": "item",
        "amount_discount": 0,
        "amount_subtotal": 15000,
        "amount_tax": 0,
        "amount_total": 15000,
        "currency": "rwf",
        "description": "White Crocs",
        "price": {
          "id": "price_1PiiiHKcvIzMIfah2EH7cMd2",
          "object": "price",
          "active": false,
          "billing_scheme": "per_unit",
          "created": 1722456093,
          "currency": "rwf",
          "custom_unit_amount": null,
          "livemode": false,
          "lookup_key": null,
          "metadata": {},
          "nickname": null,
          "product": "prod_QZsBIJ8Owey8vF",
          "recurring": null,
          "tax_behavior": "unspecified",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "one_time",
          "unit_amount": 15000,
          "unit_amount_decimal": "15000"
        },
        "quantity": 1
      }
    ],
    "has_more": false,
    "url": "/v1/checkout/sessions/cs_test_b1A0TndrGrUmsQn56yagBwsSuXNemWCsnKpI2hd2ka7kfAMZ63p19tueiD/line_items"
  },
  "livemode": false,
  "locale": null,
  "metadata": {},
  "mode": "payment",
  "payment_intent": {
    "id": "pi_3Piik5KcvIzMIfah0YkhnKKQ",
    "object": "payment_intent",
    "amount": 31000,
    "amount_capturable": 0,
    "amount_details": {
      "tip": {}
    },
    "amount_received": 31000,
    "application": null,
    "application_fee_amount": null,
    "automatic_payment_methods": null,
    "canceled_at": null,
    "cancellation_reason": null,
    "capture_method": "automatic_async",
    "client_secret": "pi_3Piik5KcvIzMIfah0YkhnKKQ_secret_Wy4QBIRbzkyPpiW4usCrULWpZ",
    "confirmation_method": "automatic",
    "created": 1722456205,
    "currency": "rwf",
    "customer": null,
    "description": null,
    "invoice": null,
    "last_payment_error": null,
    "latest_charge": "ch_3Piik5KcvIzMIfah02uGd0KY",
    "livemode": false,
    "metadata": {},
    "next_action": null,
    "on_behalf_of": null,
    "payment_method": "pm_1PiijyKcvIzMIfahoAWZfjDo",
    "payment_method_configuration_details": null,
    "payment_method_options": {
      "card": {
        "installments": null,
        "mandate_options": null,
        "network": null,
        "request_three_d_secure": "automatic"
      }
    },
    "payment_method_types": [
      "card"
    ],
    "processing": null,
    "receipt_email": null,
    "review": null,
    "setup_future_usage": null,
    "shipping": null,
    "source": null,
    "statement_descriptor": null,
    "statement_descriptor_suffix": null,
    "status": "succeeded",
    "transfer_data": null,
    "transfer_group": null
  },
  "payment_link": null,
  "payment_method_collection": "if_required",
  "payment_method_configuration_details": {
    "id": "pmc_1PifU1KcvIzMIfahSpkGLxHe",
    "parent": null
  },
  "payment_method_options": {
    "card": {
      "request_three_d_secure": "automatic"
    }
  },
  "payment_method_types": [
    "card",
    "link"
  ],
  "payment_status": "paid",
  "phone_number_collection": {
    "enabled": false
  },
  "recovered_from": null,
  "saved_payment_method_options": null,
  "setup_intent": null,
  "shipping_address_collection": null,
  "shipping_cost": null,
  "shipping_details": null,
  "shipping_options": [],
  "status": "complete",
  "submit_type": "pay",
  "subscription": null,
  "success_url": "http://localhost:3000/checkout?action=result&session_id={CHECKOUT_SESSION_ID}",
  "total_details": {
    "amount_discount": 0,
    "amount_shipping": 0,
    "amount_tax": 0
  },
  "ui_mode": "hosted",
  "url": null
}
**/
// http://localhost:3000/checkout?action=result&session_id=cs_test_b1A0TndrGrUmsQn56yagBwsSuXNemWCsnKpI2hd2ka7kfAMZ63p19tueiD

export default async function Page({ searchParams }: CheckoutPageProps) {
  const checkoutSession = await getActionFromParams(searchParams)
  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  return (
    <div className="container">
      <div>Checkout</div>
      <>
        <h2>Status: {paymentIntent.status}</h2>
        <h3>Checkout Session response:</h3>
        <PrintObject content={checkoutSession} />
      </>
    </div>
  )
}


function PrintObject({ content }: { content: Stripe.PaymentIntent | Stripe.Checkout.Session }): JSX.Element {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
}