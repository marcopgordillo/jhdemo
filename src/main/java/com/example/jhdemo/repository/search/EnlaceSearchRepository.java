package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.Enlace;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Enlace entity.
 */
public interface EnlaceSearchRepository extends ElasticsearchRepository<Enlace, Long> {
}
