package com.didasko.scheduler.web.rest;

import com.didasko.scheduler.domain.PersonInstance;
import com.didasko.scheduler.repository.PersonInstanceRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.didasko.scheduler.domain.PersonInstance}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PersonInstanceResource {

    private final Logger log = LoggerFactory.getLogger(PersonInstanceResource.class);

    private static final String ENTITY_NAME = "personInstance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonInstanceRepository personInstanceRepository;

    public PersonInstanceResource(PersonInstanceRepository personInstanceRepository) {
        this.personInstanceRepository = personInstanceRepository;
    }

    /**
     * {@code POST  /person-instances} : Create a new personInstance.
     *
     * @param personInstance the personInstance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personInstance, or with status {@code 400 (Bad Request)} if the personInstance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/person-instances")
    public ResponseEntity<PersonInstance> createPersonInstance(@RequestBody PersonInstance personInstance) throws URISyntaxException {
        log.debug("REST request to save PersonInstance : {}", personInstance);
        if (personInstance.getId() != null) {
            throw new BadRequestAlertException("A new personInstance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonInstance result = personInstanceRepository.save(personInstance);
        return ResponseEntity.created(new URI("/api/person-instances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /person-instances} : Updates an existing personInstance.
     *
     * @param personInstance the personInstance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personInstance,
     * or with status {@code 400 (Bad Request)} if the personInstance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personInstance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/person-instances")
    public ResponseEntity<PersonInstance> updatePersonInstance(@RequestBody PersonInstance personInstance) throws URISyntaxException {
        log.debug("REST request to update PersonInstance : {}", personInstance);
        if (personInstance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PersonInstance result = personInstanceRepository.save(personInstance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, personInstance.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /person-instances} : get all the personInstances.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personInstances in body.
     */
    @GetMapping("/person-instances")
    public List<PersonInstance> getAllPersonInstances(@RequestParam(required = false) String filter) {
        if ("person-is-null".equals(filter)) {
            log.debug("REST request to get all PersonInstances where person is null");
            return StreamSupport
                .stream(personInstanceRepository.findAll().spliterator(), false)
                .filter(personInstance -> personInstance.getPerson() == null)
                .collect(Collectors.toList());
        }
        if ("instance-is-null".equals(filter)) {
            log.debug("REST request to get all PersonInstances where instance is null");
            return StreamSupport
                .stream(personInstanceRepository.findAll().spliterator(), false)
                .filter(personInstance -> personInstance.getInstance() == null)
                .collect(Collectors.toList());
        }
        if ("role-is-null".equals(filter)) {
            log.debug("REST request to get all PersonInstances where role is null");
            return StreamSupport
                .stream(personInstanceRepository.findAll().spliterator(), false)
                .filter(personInstance -> personInstance.getRole() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PersonInstances");
        return personInstanceRepository.findAll();
    }

    /**
     * {@code GET  /person-instances/:id} : get the "id" personInstance.
     *
     * @param id the id of the personInstance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personInstance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/person-instances/{id}")
    public ResponseEntity<PersonInstance> getPersonInstance(@PathVariable Long id) {
        log.debug("REST request to get PersonInstance : {}", id);
        Optional<PersonInstance> personInstance = personInstanceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(personInstance);
    }

    /**
     * {@code DELETE  /person-instances/:id} : delete the "id" personInstance.
     *
     * @param id the id of the personInstance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/person-instances/{id}")
    public ResponseEntity<Void> deletePersonInstance(@PathVariable Long id) {
        log.debug("REST request to delete PersonInstance : {}", id);
        personInstanceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
