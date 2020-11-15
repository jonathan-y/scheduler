package com.didasko.scheduler.repository;

import com.didasko.scheduler.domain.PersonInstance;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PersonInstance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonInstanceRepository extends JpaRepository<PersonInstance, Long> {
}
