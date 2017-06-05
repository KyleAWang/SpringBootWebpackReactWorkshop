package com.kyle.workshop;

import org.springframework.boot.SpringApplication;

/**
 * Created by Kyle on 6/3/2017.
 */
public class StarterMain {
    public static void main(final String... args) {
        new StarterApplication(AppConfig.class).run(args);
    }
}
