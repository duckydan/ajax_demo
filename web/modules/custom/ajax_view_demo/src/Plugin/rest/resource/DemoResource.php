<?php

namespace Drupal\ajax_view_demo\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;

/**
 * Provides a Demo Resource
 *
 * @RestResource(
 *   id = "demo_resource",
 *   label = @Translation("Demo Resource"),
 *   uri_paths = {
 *     "canonical" = "/ajax_view_demo/demo_resource/{month}"
 *   }
 * )
 */

class DemoResource extends ResourceBase {
  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get($date) {

    $currentDate = strtotime($date);
    $nextDate = strtotime("+1 month", $currentDate);

   $query = \Drupal::database()->select('node_field_data', 'n')
    ->fields('n')
    ->condition('created',  $currentDate, '>=')
    ->condition('created',  $nextDate, '<');

    $result = $query->execute()->fetchAll();
    $dates = array();
    foreach ($result as $value) {
      $dates[] = date('Y-m-d', $value->created);
    }
    return new ResourceResponse($dates);
  }
}
