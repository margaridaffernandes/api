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
      "purposeID": "1740139"
    }]
  }],
  "input": [{
    "rm_type": "STATE_VARIABLE",
    "name": "",
    "variable": ""
  }],
  "rules": [{
    "uid": "regra1",
    "conditions": {
      "all": [{
        "fact": "items.0.0.items.4",
        "operator": "greaterThanInclusive",
        "value": "50"
      }]
    },
    "event": {
      "type": "events",
      "params": {
        "message": [{
          "item": "items.0.1.items.7",
          "action": "isVisible",
          "value": "Sim"
        }]
      }
    }
  }]
};
export default dlm;