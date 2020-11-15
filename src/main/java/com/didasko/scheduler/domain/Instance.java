package com.didasko.scheduler.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Instance.
 */
@Entity
@Table(name = "instance")
public class Instance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "starting_date")
    private Instant startingDate;

    @Column(name = "student_count")
    private Integer studentCount;

    @Column(name = "jhi_load")
    private Double load;

    @OneToOne
    @JoinColumn(unique = true)
    private PersonInstance personInstance;

    @OneToMany(mappedBy = "instance")
    private Set<Subject> subjects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartingDate() {
        return startingDate;
    }

    public Instance startingDate(Instant startingDate) {
        this.startingDate = startingDate;
        return this;
    }

    public void setStartingDate(Instant startingDate) {
        this.startingDate = startingDate;
    }

    public Integer getStudentCount() {
        return studentCount;
    }

    public Instance studentCount(Integer studentCount) {
        this.studentCount = studentCount;
        return this;
    }

    public void setStudentCount(Integer studentCount) {
        this.studentCount = studentCount;
    }

    public Double getLoad() {
        return load;
    }

    public Instance load(Double load) {
        this.load = load;
        return this;
    }

    public void setLoad(Double load) {
        this.load = load;
    }

    public PersonInstance getPersonInstance() {
        return personInstance;
    }

    public Instance personInstance(PersonInstance personInstance) {
        this.personInstance = personInstance;
        return this;
    }

    public void setPersonInstance(PersonInstance personInstance) {
        this.personInstance = personInstance;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Instance subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Instance addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.setInstance(this);
        return this;
    }

    public Instance removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.setInstance(null);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Instance)) {
            return false;
        }
        return id != null && id.equals(((Instance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Instance{" +
            "id=" + getId() +
            ", startingDate='" + getStartingDate() + "'" +
            ", studentCount=" + getStudentCount() +
            ", load=" + getLoad() +
            "}";
    }
}
