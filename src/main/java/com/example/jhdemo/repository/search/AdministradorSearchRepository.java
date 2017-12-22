package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.Administrador;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Administrador entity.
 */
public interface AdministradorSearchRepository extends ElasticsearchRepository<Administrador, Long> {
}
