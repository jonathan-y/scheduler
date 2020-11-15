package com.didasko.scheduler.web.rest;

import com.didasko.scheduler.SchedulerApp;
import com.didasko.scheduler.domain.Instance;
import com.didasko.scheduler.repository.InstanceRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InstanceResource} REST controller.
 */
@SpringBootTest(classes = SchedulerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InstanceResourceIT {

    private static final Instant DEFAULT_STARTING_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_STARTING_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_STUDENT_COUNT = 1;
    private static final Integer UPDATED_STUDENT_COUNT = 2;

    private static final Double DEFAULT_LOAD = 1D;
    private static final Double UPDATED_LOAD = 2D;

    @Autowired
    private InstanceRepository instanceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInstanceMockMvc;

    private Instance instance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instance createEntity(EntityManager em) {
        Instance instance = new Instance()
            .startingDate(DEFAULT_STARTING_DATE)
            .studentCount(DEFAULT_STUDENT_COUNT)
            .load(DEFAULT_LOAD);
        return instance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instance createUpdatedEntity(EntityManager em) {
        Instance instance = new Instance()
            .startingDate(UPDATED_STARTING_DATE)
            .studentCount(UPDATED_STUDENT_COUNT)
            .load(UPDATED_LOAD);
        return instance;
    }

    @BeforeEach
    public void initTest() {
        instance = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstance() throws Exception {
        int databaseSizeBeforeCreate = instanceRepository.findAll().size();
        // Create the Instance
        restInstanceMockMvc.perform(post("/api/instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isCreated());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeCreate + 1);
        Instance testInstance = instanceList.get(instanceList.size() - 1);
        assertThat(testInstance.getStartingDate()).isEqualTo(DEFAULT_STARTING_DATE);
        assertThat(testInstance.getStudentCount()).isEqualTo(DEFAULT_STUDENT_COUNT);
        assertThat(testInstance.getLoad()).isEqualTo(DEFAULT_LOAD);
    }

    @Test
    @Transactional
    public void createInstanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = instanceRepository.findAll().size();

        // Create the Instance with an existing ID
        instance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstanceMockMvc.perform(post("/api/instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isBadRequest());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInstances() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        // Get all the instanceList
        restInstanceMockMvc.perform(get("/api/instances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instance.getId().intValue())))
            .andExpect(jsonPath("$.[*].startingDate").value(hasItem(DEFAULT_STARTING_DATE.toString())))
            .andExpect(jsonPath("$.[*].studentCount").value(hasItem(DEFAULT_STUDENT_COUNT)))
            .andExpect(jsonPath("$.[*].load").value(hasItem(DEFAULT_LOAD.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getInstance() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        // Get the instance
        restInstanceMockMvc.perform(get("/api/instances/{id}", instance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(instance.getId().intValue()))
            .andExpect(jsonPath("$.startingDate").value(DEFAULT_STARTING_DATE.toString()))
            .andExpect(jsonPath("$.studentCount").value(DEFAULT_STUDENT_COUNT))
            .andExpect(jsonPath("$.load").value(DEFAULT_LOAD.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingInstance() throws Exception {
        // Get the instance
        restInstanceMockMvc.perform(get("/api/instances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstance() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        int databaseSizeBeforeUpdate = instanceRepository.findAll().size();

        // Update the instance
        Instance updatedInstance = instanceRepository.findById(instance.getId()).get();
        // Disconnect from session so that the updates on updatedInstance are not directly saved in db
        em.detach(updatedInstance);
        updatedInstance
            .startingDate(UPDATED_STARTING_DATE)
            .studentCount(UPDATED_STUDENT_COUNT)
            .load(UPDATED_LOAD);

        restInstanceMockMvc.perform(put("/api/instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstance)))
            .andExpect(status().isOk());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeUpdate);
        Instance testInstance = instanceList.get(instanceList.size() - 1);
        assertThat(testInstance.getStartingDate()).isEqualTo(UPDATED_STARTING_DATE);
        assertThat(testInstance.getStudentCount()).isEqualTo(UPDATED_STUDENT_COUNT);
        assertThat(testInstance.getLoad()).isEqualTo(UPDATED_LOAD);
    }

    @Test
    @Transactional
    public void updateNonExistingInstance() throws Exception {
        int databaseSizeBeforeUpdate = instanceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstanceMockMvc.perform(put("/api/instances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instance)))
            .andExpect(status().isBadRequest());

        // Validate the Instance in the database
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstance() throws Exception {
        // Initialize the database
        instanceRepository.saveAndFlush(instance);

        int databaseSizeBeforeDelete = instanceRepository.findAll().size();

        // Delete the instance
        restInstanceMockMvc.perform(delete("/api/instances/{id}", instance.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Instance> instanceList = instanceRepository.findAll();
        assertThat(instanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
