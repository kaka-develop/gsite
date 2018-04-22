package com.gsite.app.config.payment;

import com.gsite.app.domain.WebTemplate;
import com.gsite.app.domain.Website;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class PayPalAPI {
    private final Logger log = LoggerFactory.getLogger(PayPalAPI.class);

    private APIContext apiContext;
    private String cancelUrl;

    private String returnUrl;

    public PayPalAPI(APIContext apiContext, String cancelUrl, String returnUrl) {
        this.apiContext = apiContext;
        this.cancelUrl = cancelUrl;
        this.returnUrl = returnUrl;
    }

    public Payment createWebsitePayment(Website website, WebTemplate template) {
        this.apiContext.setRequestId(website.getId());

        BigDecimal templatePrice = template.getPrice();
        BigDecimal shipping = new BigDecimal(0);
        BigDecimal tax = new BigDecimal(0);
        String currency = "USD";

        String templateName = template.getName();
        String templateDes = "This is the payment transaction description.";

        Payment createdPayment = null;
        // ###Payer
        // A resource representing a Payer that funds a payment
        // Payment Method
        // as 'paypal'
        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        // transactions
        BigDecimal total = templatePrice.add(shipping).add(tax);
        Details details = new Details();
        details.setShipping(shipping.toString());
        details.setSubtotal(templatePrice.toString());
        details.setTax(tax.toString());

        // ###Amount
        // Let's you specify a payment amount.
        Amount amount = new Amount();
        amount.setCurrency(currency);
        // Total must be equal to sum of shipping, tax and subtotal.
        amount.setTotal(total.toString());
        amount.setDetails(details);

        // ###Transaction
        // A transaction defines the contract of a
        // payment - what is the payment for and who
        // is fulfilling it. Transaction is created with
        // a `Payee` and `Amount` types
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction
            .setDescription(templateDes);

        // ### Items
        Item item = new Item();
        item.setName("Template: " + templateName).setQuantity("1").setCurrency(currency).setPrice(templatePrice.toString());
        ItemList itemList = new ItemList();
        List<Item> items = new ArrayList<Item>();
        items.add(item);
        itemList.setItems(items);
        transaction.setItemList(itemList);

        // The Payment creation API requires a list of
        // Transaction; add the created `Transaction`
        // to a List
        List<Transaction> transactions = new ArrayList<Transaction>();
        transactions.add(transaction);

        // ###Payment
        // A Payment Resource; create one using
        // the above types and intent as 'sale'
        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        // ###Redirect URLs
        String cancelURL = cancelUrl + website.getId();
        String returnURL = returnUrl + website.getId();
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelURL);
        redirectUrls.setReturnUrl(returnURL);
        payment.setRedirectUrls(redirectUrls);

        try {
            createdPayment = payment.create(apiContext);
            log.info("Created payment with id = "
                + createdPayment.getId() + " and status = "
                + createdPayment.getState());
        } catch (PayPalRESTException e) {
            log.error(e.getMessage());
        }
        return createdPayment;

    }


    public Payment executePayment(String paymentID, String payerID) {
        Payment payment = new Payment();
        payment.setId(paymentID);
        try {
            PaymentExecution paymentExecution = new PaymentExecution();
            paymentExecution.setPayerId(payerID);
            payment  = payment.execute(apiContext, paymentExecution);
        } catch (PayPalRESTException e) {
            log.error(e.getMessage());
            payment = null;
        }
        return  payment;
    }

    public Payment createWebsitePaymentWithCard(Website website,WebTemplate template, CreditCard creditCard) {
        this.apiContext.setRequestId(website.getId());

        BigDecimal templatePrice = template.getPrice();
        BigDecimal shipping = new BigDecimal(0);
        BigDecimal tax = new BigDecimal(0);
        String currency = "USD";

        String templateName = template.getName();
        String templateDes = "This is the payment transaction description.";

        // ###Address
        // Base Address object used as shipping or billing
        // address in a payment. [Optional]
//        Address billingAddress = new Address();
//        billingAddress.setCity("Johnstown");
//        billingAddress.setCountryCode("US");
//        billingAddress.setLine1("52 N Main ST");
//        billingAddress.setPostalCode("43210");
//        billingAddress.setState("OH");
//
//        // ###CreditCard
//        // A resource representing a credit card that can be
//        // used to fund a payment.
//        creditCard.setBillingAddress(billingAddress);

        // ###Details
        // Let's you specify details of a payment amount.
        BigDecimal total = templatePrice.add(shipping).add(tax);
        Details details = new Details();
        details.setShipping(shipping.toString());
        details.setSubtotal(templatePrice.toString());
        details.setTax(tax.toString());

        // ###Amount
        // Let's you specify a payment amount.
        Amount amount = new Amount();
        amount.setCurrency(currency);
        // Total must be equal to sum of shipping, tax and subtotal.
        amount.setTotal(total.toString());
        amount.setDetails(details);

        // ###Transaction
        // A transaction defines the contract of a
        // payment - what is the payment for and who
        // is fulfilling it. Transaction is created with
        // a `Payee` and `Amount` types
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction
            .setDescription(templateDes);

        // The Payment creation API requires a list of
        // Transaction; add the created `Transaction`
        // to a List
        List<Transaction> transactions = new ArrayList<Transaction>();
        transactions.add(transaction);

        // ###FundingInstrument
        // A resource representing a Payeer's funding instrument.
        // Use a Payer ID (A unique identifier of the payer generated
        // and provided by the facilitator. This is required when
        // creating or using a tokenized funding instrument)
        // and the `CreditCardDetails`
        FundingInstrument fundingInstrument = new FundingInstrument();
        fundingInstrument.setCreditCard(creditCard);

        // The Payment creation API requires a list of
        // FundingInstrument; add the created `FundingInstrument`
        // to a List
        List<FundingInstrument> fundingInstrumentList = new ArrayList<FundingInstrument>();
        fundingInstrumentList.add(fundingInstrument);

        // ###Payer
        // A resource representing a Payer that funds a payment
        // Use the List of `FundingInstrument` and the Payment Method
        // as 'credit_card'
        Payer payer = new Payer();
        payer.setFundingInstruments(fundingInstrumentList);
        payer.setPaymentMethod("credit_card");

        // ###Payment
        // A Payment Resource; create one using
        // the above types and intent as 'sale'
        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        Payment createdPayment = null;
        try {
            createdPayment = payment.create(apiContext);
            log.info("Created payment with id = " + createdPayment.getId()
                + " and status = " + createdPayment.getState());
        } catch (PayPalRESTException e) {
            log.error(e.getMessage());
        }
        return createdPayment;
    }

}
