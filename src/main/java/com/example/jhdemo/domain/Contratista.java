package com.example.jhdemo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Contratista.
 */
@Entity
@Table(name = "contratista")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "contratista")
public class Contratista implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @NotNull
    @Size(min = 13, max = 13)
    @Column(name = "ruc", length = 13, nullable = false)
    private String ruc;

    @Column(name = "contacto_nombre")
    private String contactoNombre;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "email")
    private String email;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Contratista razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getRuc() {
        return ruc;
    }

    public Contratista ruc(String ruc) {
        this.ruc = ruc;
        return this;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getContactoNombre() {
        return contactoNombre;
    }

    public Contratista contactoNombre(String contactoNombre) {
        this.contactoNombre = contactoNombre;
        return this;
    }

    public void setContactoNombre(String contactoNombre) {
        this.contactoNombre = contactoNombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public Contratista direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public Contratista telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public Contratista email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Contratista contratista = (Contratista) o;
        if (contratista.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contratista.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contratista{" +
            "id=" + getId() +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", ruc='" + getRuc() + "'" +
            ", contactoNombre='" + getContactoNombre() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
