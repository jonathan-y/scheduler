package com.didasko.scheduler.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PersonInstance.
 */
@Entity
@Table(name = "person_instance")
public class PersonInstance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "personInstance")
    @JsonIgnore
    private Person person;

    @OneToOne(mappedBy = "personInstance")
    @JsonIgnore
    private Instance instance;

    @OneToOne(mappedBy = "personInstance")
    @JsonIgnore
    private Role role;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public PersonInstance person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Instance getInstance() {
        return instance;
    }

    public PersonInstance instance(Instance instance) {
        this.instance = instance;
        return this;
    }

    public void setInstance(Instance instance) {
        this.instance = instance;
    }

    public Role getRole() {
        return role;
    }

    public PersonInstance role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersonInstance)) {
            return false;
        }
        return id != null && id.equals(((PersonInstance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonInstance{" +
            "id=" + getId() +
            "}";
    }
}
