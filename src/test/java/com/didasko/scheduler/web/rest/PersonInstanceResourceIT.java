package com.didasko.scheduler.web.rest;

import com.didasko.scheduler.SchedulerApp;
import com.didasko.scheduler.domain.PersonInstance;
import com.didasko.scheduler.repository.PersonInstanceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PersonInstanceResource} REST controller.
 */
@SpringBootTest(classes = SchedulerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PersonInstanceResourceIT {

    @Autowired
    private PersonInstanceRepository personInstanceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonInstanceMockMvc;

    private PersonInstance personInstance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonInstance createEntity(EntityManager em) {
        PersonInstance personInstance = new PersonInstance();
        return personInstance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonInstance createUpdatedEntity(EntityManager em) {
        PersonInstance personInstance = new PersonInstance();
        return personInstance;
    }

    @BeforeEach
    public void initTest() {
        personInstance = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonInstance() throws Exception {
        int databaseSizeBeforeCreate = personInstanceRepository.findAll().size();
        // Create the PersonInstance
        restPersonInstanceMockMvc.perform(post("/api/person-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personInstance)))
            .andExpect(status().isCreated());

        // Validate the PersonInstance in the database
        List<PersonInstance> personInstanceList = personInstanceRepository.findAll();
        assertThat(personInstanceList).hasSize(databaseSizeBeforeCreate + 1);
        PersonInstance testPersonInstance = personInstanceList.get(personInstanceList.size() - 1);
    }

    @Test
    @Transactional
    public void createPersonInstanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personInstanceRepository.findAll().size();

        // Create the PersonInstance with an existing ID
        personInstance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonInstanceMockMvc.perform(post("/api/person-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personInstance)))
            .andExpect(status().isBadRequest());

        // Validate the PersonInstance in the database
        List<PersonInstance> personInstanceList = personInstanceRepository.findAll();
        assertThat(personInstanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPersonInstances() throws Exception {
        // Initialize the database
        personInstanceRepository.saveAndFlush(personInstance);

        // Get all the personInstanceList
        restPersonInstanceMockMvc.perform(get("/api/person-instances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personInstance.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPersonInstance() throws Exception {
        // Initialize the database
        personInstanceRepository.saveAndFlush(personInstance);

        // Get the personInstance
        restPersonInstanceMockMvc.perform(get("/api/person-instances/{id}", personInstance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(personInstance.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPersonInstance() throws Exception {
        // Get the personInstance
        restPersonInstanceMockMvc.perform(get("/api/person-instances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonInstance() throws Exception {
        // Initialize the database
        personInstanceRepository.saveAndFlush(personInstance);

        int databaseSizeBeforeUpdate = personInstanceRepository.findAll().size();

        // Update the personInstance
        PersonInstance updatedPersonInstance = personInstanceRepository.findById(personInstance.getId()).get();
        // Disconnect from session so that the updates on updatedPersonInstance are not directly saved in db
        em.detach(updatedPersonInstance);

        restPersonInstanceMockMvc.perform(put("/api/person-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersonInstance)))
            .andExpect(status().isOk());

        // Validate the PersonInstance in the database
        List<PersonInstance> personInstanceList = personInstanceRepository.findAll();
        assertThat(personInstanceList).hasSize(databaseSizeBeforeUpdate);
        PersonInstance testPersonInstance = personInstanceList.get(personInstanceList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonInstance() throws Exception {
        int databaseSizeBeforeUpdate = personInstanceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonInstanceMockMvc.perform(put("/api/person-instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personInstance)))
            .andExpect(status().isBadRequest());

        // Validate the PersonInstance in the database
        List<PersonInstance> personInstanceList = personInstanceRepository.findAll();
        assertThat(personInstanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersonInstance() throws Exception {
        // Initialize the database
        personInstanceRepository.saveAndFlush(personInstance);

        int databaseSizeBeforeDelete = personInstanceRepository.findAll().size();

        // Delete the personInstance
        restPersonInstanceMockMvc.perform(delete("/api/person-instances/{id}", personInstance.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PersonInstance> personInstanceList = personInstanceRepository.findAll();
        assertThat(personInstanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
