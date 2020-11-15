package com.didasko.scheduler.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JsonIgnoreProperties(value = "subjects", allowSetters = true)
    private Instance instance;

    @ManyToMany(mappedBy = "competencies")
    @JsonIgnore
    private Set<Person> deliverers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Subject code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public Subject title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instance getInstance() {
        return instance;
    }

    public Subject instance(Instance instance) {
        this.instance = instance;
        return this;
    }

    public void setInstance(Instance instance) {
        this.instance = instance;
    }

    public Set<Person> getDeliverers() {
        return deliverers;
    }

    public Subject deliverers(Set<Person> people) {
        this.deliverers = people;
        return this;
    }

    public Subject addDeliverers(Person person) {
        this.deliverers.add(person);
        person.getCompetencies().add(this);
        return this;
    }

    public Subject removeDeliverers(Person person) {
        this.deliverers.remove(person);
        person.getCompetencies().remove(this);
        return this;
    }

    public void setDeliverers(Set<Person> people) {
        this.deliverers = people;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subject)) {
            return false;
        }
        return id != null && id.equals(((Subject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
