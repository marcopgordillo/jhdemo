package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.Contrato;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Contrato entity.
 */
public interface ContratoSearchRepository extends ElasticsearchRepository<Contrato, Long> {
}
