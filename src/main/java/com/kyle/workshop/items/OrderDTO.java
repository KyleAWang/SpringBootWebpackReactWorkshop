package com.kyle.workshop.items;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by Kyle on 6/5/2017.
 */
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class OrderDTO {
    private Integer id;
    private List<OrderItemDTO> order;
}
