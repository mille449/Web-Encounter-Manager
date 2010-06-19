
// we want encounter to be a singleton
var Encounter = new function(){
    this.Combatants = {};

    this.AddCombatant = function(combatant){
        this.Combatants[combatant.ID] = combatant;
    }

    this.IterateCombatants = function(delegate){
        // use correct iteration here!
        for (var combatant in this.Combatants){
            delegate(combatant);
        }
    };
    this.Round = 0;

    this.Reset = function(){
        this.IterateCombatants(function(combatant){
            combatant.CurrHP = combatant.MaxHP;
        });
    };

    this.CheckEndConditions = function(combatant){
        
    }

    this.CheckStartConditions = function(combatant){

    }

}


