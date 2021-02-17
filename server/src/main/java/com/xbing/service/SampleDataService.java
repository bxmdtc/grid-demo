package com.xbing.service;

import com.xbing.entity.SampleData;
import com.xbing.repository.SampleDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SampleDataService {

    @Autowired
    SampleDataRepository sampleDataRepository;

    public List<SampleData> getAll() {
        return sampleDataRepository.findAll();
    }

    public SampleData save(SampleData save) {
        return sampleDataRepository.save(save);
    }

    public List<SampleData> saveAll(List<SampleData> list) {

        return sampleDataRepository.saveAll(list);
    }

    public void delete(List<Long> list) {
        for(long id: list) {
            sampleDataRepository.deleteById(id);
        }
    }

    public void delete(Long id) {
        sampleDataRepository.deleteById(id);
    }



}
