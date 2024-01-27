<?php
abstract class BaseService {

  protected $dao;

  public function __construct($dao){
    $this->dao = $dao;
  }

  public function get_all($search){
    return $this->dao->get_all($search);
  }

  public function get_by_id($id){
    return $this->dao->get_by_id($id);
  }

  public function delete($id){
    return $this->dao->delete($id);
  }


  // public function add($user, $entity){
  //   return $this->dao->add($entity);
  // }
  //
  // public function update($user, $id, $entity){
  //   return $this->dao->update($id, $entity);
  // }
  //

}
?>
