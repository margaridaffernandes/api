const fieldSource = {
  beginDrag(props) {
    return {
      order: props.order,
      // Ordem do item
      groupID: props.groupID,
      // O seu groupID => só podemos movimentar items dentro do mesmo groupID
      path: props.path,
      // Path do item/section
      pathRM: props.pathRM,
      // Path da section "pai" do campo RM
      isRM: props.isRM,
      // Para saber se é um campo do RM
      data: props.data,
      handleRM: props.handleRM,
      isSection: props.isSection,
      // Para saber se é uma section ou item
      isAny: props.isAny,
      // Para saber se é um campo Any
      showLabel: props.showLabel // Para saber se não é o primeiro item de um campo Any (não é se showLabel for falso)

    };
  }

};
export { fieldSource };