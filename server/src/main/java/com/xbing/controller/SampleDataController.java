package com.xbing.controller;

import com.xbing.entity.SampleData;
import com.xbing.service.SampleDataService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/sampledata")
public class SampleDataController {

    @Autowired
    SampleDataService sampleDataService;

    @GetMapping
    public List<SampleData> getAll() {
        log.info("getAll() called");
        return sampleDataService.getAll();
    }

    @PostMapping
    public SampleData update(@RequestBody SampleData data) {
        log.info("updateAll() called for: {}", data);
        return sampleDataService.save(data);
    }

    @PostMapping("/saveAll")
    public void updateAll(@RequestBody List<SampleData> list) {
        log.info("updateAll() called for: {}", list);
        sampleDataService.saveAll(list);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(required = true) long id) {
        log.info("delete() called for id: {}", id);
        sampleDataService.delete(id);
    }

    @PostMapping("/deleteAll")
    public void delete(@RequestBody(required = true) List<Long> list) {
        log.info("delete() called for ids: {}", list);
        sampleDataService.delete(list);
    }

}
