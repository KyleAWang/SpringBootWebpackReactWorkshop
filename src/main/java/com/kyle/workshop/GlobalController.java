package com.kyle.workshop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Kyle on 6/5/2017.
 */
@Controller
public class GlobalController {
    @RequestMapping(value = {"/", "/summary"})
    public String index() {
        return "forward:index.html";
    }
}
