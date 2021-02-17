package com.xbing.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class SampleData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String language;

    private String country;

    private String gameName;

    private boolean bought;

    private long bankBalance;

    private int rating;

    private long totalWinnings;


}
