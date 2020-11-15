package com.didasko.scheduler.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fte")
    private Double fte;

    @OneToOne
    @JoinColumn(unique = true)
    private PersonInstance personInstance;

    @ManyToMany
    @JoinTable(name = "person_competencies",
               joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "competencies_id", referencedColumnName = "id"))
    private Set<Subject> competencies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getFte() {
        return fte;
    }

    public Person fte(Double fte) {
        this.fte = fte;
        return this;
    }

    public void setFte(Double fte) {
        this.fte = fte;
    }

    public PersonInstance getPersonInstance() {
        return personInstance;
    }

    public Person personInstance(PersonInstance personInstance) {
        this.personInstance = personInstance;
        return this;
    }

    public void setPersonInstance(PersonInstance personInstance) {
        this.personInstance = personInstance;
    }

    public Set<Subject> getCompetencies() {
        return competencies;
    }

    public Person competencies(Set<Subject> subjects) {
        this.competencies = subjects;
        return this;
    }

    public Person addCompetencies(Subject subject) {
        this.competencies.add(subject);
        subject.getDeliverers().add(this);
        return this;
    }

    public Person removeCompetencies(Subject subject) {
        this.competencies.remove(subject);
        subject.getDeliverers().remove(this);
        return this;
    }

    public void setCompetencies(Set<Subject> subjects) {
        this.competencies = subjects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Person)) {
            return false;
        }
        return id != null && id.equals(((Person) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", fte=" + getFte() +
            "}";
    }
}
