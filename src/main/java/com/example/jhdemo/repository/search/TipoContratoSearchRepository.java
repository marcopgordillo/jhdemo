package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.TipoContrato;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoContrato entity.
 */
public interface TipoContratoSearchRepository extends ElasticsearchRepository<TipoContrato, Long> {
}
