package com.kyle.workshop.items;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Created by Kyle on 6/3/2017.
 */
@EqualsAndHashCode(of = { "name", "amount" })
@ToString(of = { "id", "name", "amount" })
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ItemDTO {
    private Integer id;
    private String name;
    private int amount;

    public ItemDTO(Integer id, String name, int amount){
        this.id = id;
        this.name = name;
        this.amount = amount;
    }
}
