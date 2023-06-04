const dlm = {
  "description": [{
    "lifecycle_state": "Author draft",
    "original_author": [{
      "name": "GTPCE",
      "organization": "CHUP",
      "date": "current_timestamp"
    }],
    "details": [{
      "language": "pt",
      "purpose": "",
      "purposeID": "12345"
    }]
  }],
  "input": [{
    "rm_type": "STATE_VARIABLE",
    "name": "Decisão",
    "variable": "items.0.0.items.0.items.2"
  }],
  "rules": [{
    "uid": "regra1",
    "conditions": {
      "all": [{
        "fact": "items.0.0.items.0.items.0.items.1",
        "operator": "equal",
        "value": "Secundário"
      }]
    },
    "event": {
      "type": "items.0.0.items.0.items.5.items.0",
      "params": {
        "message": {
          "action": "isMandatory"
        }
      }
    }
  }, {
    "uid": "regra2",
    "conditions": {
      "all": [{
        "fact": "items.0.0.items.0.items.0.items.1",
        "operator": "equal",
        "value": "Temporário"
      }]
    },
    "event": {
      "type": "items.0.0.items.0.items.3",
      "params": {
        "message": {
          "action": "isNotEditable"
        }
      }
    }
  }]
};
export default dlm;