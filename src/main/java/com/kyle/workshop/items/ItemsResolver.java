package com.kyle.workshop.items;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Kyle on 6/3/2017.
 */
public class ItemsResolver {
    private static final Logger logger = LoggerFactory.getLogger(ItemsResolver.class);
    private static ConcurrentHashMap<Integer, ItemDTO> items;

    private ItemsResolver() {
    }

    public static ConcurrentHashMap<Integer, ItemDTO> getItems(){
        if (items == null) {
            synchronized (ItemsResolver.class) {
                if (items == null) {
                    items = new ConcurrentHashMap<>();

                    if (logger.isInfoEnabled()){
                        logger.info("Init ItemsResolver");
                    }
                    ItemDTO itemDTO_1 = new ItemDTO(1, "Item A", 20);
                    items.put(1, itemDTO_1);
                    ItemDTO itemDTO_2 = new ItemDTO(2, "Item B", 20 );
                    items.put(2, itemDTO_2);
                    if (logger.isInfoEnabled()) {
                        logger.info("Finish init items data source. items size: " + items.size());
                    }
                }
            }
        }
        return items;
    }
}
