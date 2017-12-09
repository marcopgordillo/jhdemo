package com.example.jhdemo.repository.search;

import com.example.jhdemo.domain.Supervisor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Supervisor entity.
 */
public interface SupervisorSearchRepository extends ElasticsearchRepository<Supervisor, Long> {
}
