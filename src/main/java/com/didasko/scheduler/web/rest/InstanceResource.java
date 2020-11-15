package com.didasko.scheduler.web.rest;

import com.didasko.scheduler.domain.Instance;
import com.didasko.scheduler.repository.InstanceRepository;
import com.didasko.scheduler.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.didasko.scheduler.domain.Instance}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InstanceResource {

    private final Logger log = LoggerFactory.getLogger(InstanceResource.class);

    private static final String ENTITY_NAME = "instance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InstanceRepository instanceRepository;

    public InstanceResource(InstanceRepository instanceRepository) {
        this.instanceRepository = instanceRepository;
    }

    /**
     * {@code POST  /instances} : Create a new instance.
     *
     * @param instance the instance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new instance, or with status {@code 400 (Bad Request)} if the instance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/instances")
    public ResponseEntity<Instance> createInstance(@RequestBody Instance instance) throws URISyntaxException {
        log.debug("REST request to save Instance : {}", instance);
        if (instance.getId() != null) {
            throw new BadRequestAlertException("A new instance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Instance result = instanceRepository.save(instance);
        return ResponseEntity.created(new URI("/api/instances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /instances} : Updates an existing instance.
     *
     * @param instance the instance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated instance,
     * or with status {@code 400 (Bad Request)} if the instance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the instance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/instances")
    public ResponseEntity<Instance> updateInstance(@RequestBody Instance instance) throws URISyntaxException {
        log.debug("REST request to update Instance : {}", instance);
        if (instance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Instance result = instanceRepository.save(instance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, instance.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /instances} : get all the instances.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of instances in body.
     */
    @GetMapping("/instances")
    public List<Instance> getAllInstances() {
        log.debug("REST request to get all Instances");
        return instanceRepository.findAll();
    }

    /**
     * {@code GET  /instances/:id} : get the "id" instance.
     *
     * @param id the id of the instance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the instance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/instances/{id}")
    public ResponseEntity<Instance> getInstance(@PathVariable Long id) {
        log.debug("REST request to get Instance : {}", id);
        Optional<Instance> instance = instanceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(instance);
    }

    /**
     * {@code DELETE  /instances/:id} : delete the "id" instance.
     *
     * @param id the id of the instance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/instances/{id}")
    public ResponseEntity<Void> deleteInstance(@PathVariable Long id) {
        log.debug("REST request to delete Instance : {}", id);
        instanceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
