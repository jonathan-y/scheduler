package com.didasko.scheduler.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "weighting")
    private Double weighting;

    @OneToOne
    @JoinColumn(unique = true)
    private PersonInstance personInstance;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Role title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getWeighting() {
        return weighting;
    }

    public Role weighting(Double weighting) {
        this.weighting = weighting;
        return this;
    }

    public void setWeighting(Double weighting) {
        this.weighting = weighting;
    }

    public PersonInstance getPersonInstance() {
        return personInstance;
    }

    public Role personInstance(PersonInstance personInstance) {
        this.personInstance = personInstance;
        return this;
    }

    public void setPersonInstance(PersonInstance personInstance) {
        this.personInstance = personInstance;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Role)) {
            return false;
        }
        return id != null && id.equals(((Role) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", weighting=" + getWeighting() +
            "}";
    }
}
