package com.xbing.repository;

import com.xbing.entity.SampleData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleDataRepository extends JpaRepository<SampleData, Long> {

}
