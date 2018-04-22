package com.gsite.app.web.rest;

import com.gsite.app.service.WebsitePaymentService;
import com.paypal.api.payments.*;
import io.swagger.annotations.ApiParam;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Iterator;

@RestController
@RequestMapping("/api")
public class WebsitePaymentResource {

    private final Logger log = LoggerFactory.getLogger(WebsitePaymentResource.class);

    @Inject
    private WebsitePaymentService paymentService;


    @PostMapping("/website-payment/create")
    public ResponseEntity<String> create(@RequestParam String webId) throws JSONException {
        Payment payment = paymentService.createPayment(webId);

        if (payment != null) {
            String approveLink = getApprovalLink(payment);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("approval_link", approveLink);
            jsonObject.put("paymentID", payment.getId());
            return ResponseEntity.ok().body(jsonObject.toString());
        } else
            return ResponseEntity.badRequest().body("");
    }

    @PostMapping("/website-payment/execute")
    public ResponseEntity<String> execute(@ApiParam String paymentID, @ApiParam String payerID) {
        Payment payment = paymentService.executePayment(paymentID, payerID);
        if (payment != null)
            return ResponseEntity.ok().body("");
        else
            return ResponseEntity.badRequest().body("");
    }

    @PostMapping("/website-payment/credit-card")
    public ResponseEntity<String> creditCard(@ApiParam String webId, @ApiParam String number,
                                             @ApiParam String type, @ApiParam String firstName,
                                             @ApiParam String lastName, @ApiParam int month,
                                             @ApiParam int year, @ApiParam String cvv) {

        CreditCard creditCard = createCreditCard(number, type, firstName, lastName, month, year, cvv);
        Payment payment = paymentService.createCreditCardPayment(webId, creditCard);
        if (payment != null)
            return ResponseEntity.ok().body("");
        else
            return ResponseEntity.badRequest().body("");
    }


    private CreditCard createCreditCard(String number, String type, String firstName, String lastName, int month, int year, String cvv) {
        CreditCard creditCard = new CreditCard();
        creditCard.setCvv2(cvv);
        creditCard.setExpireMonth(month);
        creditCard.setExpireYear(year);
        creditCard.setFirstName(firstName);
        creditCard.setLastName(lastName);
        creditCard.setNumber(number);
        creditCard.setType(type);
        return creditCard;
    }


    private String getApprovalLink(Payment payment) {
        // ###Payment Approval Url
        String url = "";
        Iterator<Links> links = payment.getLinks().iterator();
        while (links.hasNext()) {
            Links link = links.next();
            if (link.getRel().equalsIgnoreCase("approval_url")) {
                url = link.getHref();
            }
        }
        return url;
    }
}
