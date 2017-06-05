package com.kyle.workshop.items;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Created by Kyle on 6/5/2017.
 */
@EqualsAndHashCode(of = { "id", "quantity" })
@ToString(of = { "id", "quantity" })
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class OrderItemDTO {
    private Integer id;
    private int quantity;
}
