package com.kyle.workshop.items;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Kyle on 6/3/2017.
 */
@Service
public class ItemsServiceImpl implements ItemsService {
    private static final Logger logger = LoggerFactory.getLogger(ItemsServiceImpl.class);

    @Override
    public List<ItemDTO> getItems() {
        if (logger.isInfoEnabled()) {
            logger.info("Get Items: " +  ItemsResolver.getItems());
        }
        List<ItemDTO> list = new ArrayList<>(ItemsResolver.getItems().values());
        return list;
    }
}
