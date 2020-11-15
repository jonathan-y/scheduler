package com.didasko.scheduler.repository;

import com.didasko.scheduler.domain.Instance;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Instance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstanceRepository extends JpaRepository<Instance, Long> {
}
