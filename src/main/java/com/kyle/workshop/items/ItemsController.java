package com.kyle.workshop.items;

import com.kyle.workshop.util.ItemErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

/**
 * Created by Kyle on 6/3/2017.
 */
@RestController
public class ItemsController {
    private static final Logger logger = LoggerFactory.getLogger(ItemsController.class);
    @Autowired
    private ItemsService itemsService;

    @RequestMapping(value = "/api/items", method = RequestMethod.GET)
    public List<ItemDTO> findAll() {
        if (logger.isInfoEnabled()) {
            logger.info("Fetch all items");
        }
        return itemsService.getItems();
    }

    @RequestMapping(value = "/api/items/order", method = RequestMethod.POST)
    public ResponseEntity placeOrder(@RequestBody OrderItemDTO[] orderArray) {
        if (logger.isInfoEnabled()) {
            logger.info("Place an order");
        }

        StringBuilder errorMessage = new StringBuilder();

        if (orderArray != null && orderArray.length > 0) {
            Map<Integer, ItemDTO> items = ItemsResolver.getItems();
            for(int i = 0; i < orderArray.length; i++){
                if (items.containsKey(orderArray[i].getId())) {
                    ItemDTO item = items.get(orderArray[i].getId());

                    if (item.getAmount() > 0) {
                        if (orderArray[i].getQuantity() <= item.getAmount()) {
                            item.setAmount(item.getAmount() - orderArray[i].getQuantity());
                        } else {
                            errorMessage.append(item.getId());
                            errorMessage.append("_");
                            errorMessage.append(item.getName());
                            errorMessage.append(" only has ");
                            errorMessage.append(item.getAmount());
                            errorMessage.append(" items. Please decrease your quantity. ");
                        }
                    } else {
                        errorMessage.append(item.getId());
                        errorMessage.append("_");
                        errorMessage.append(item.getName());
                        errorMessage.append(" is out of stock.");
                    }
                }
            }
        }

        if (!errorMessage.toString().equals("") ){
            return new ResponseEntity(new ItemErrorType(errorMessage.toString()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(itemsService.getItems(), HttpStatus.OK);
    }
}
