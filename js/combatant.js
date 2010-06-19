
var CombatantIDCounter = 0;

function Combatant(){

    this.ID = CombatantIDCounter++;
    this.CurrHP = 0;
    this.TempHP = 0;
    this.MaxHP = 0;
    this.InitiativeRoll = 0;
    this.FailedDeathSaves = 0;
    this.Round = 0;
    this.Name = "";

    this.BloodiedValue = 0;
    this.Initiative = 0;
    this.IsBloodied = false;
    this.IsDying = false;
    this.IsDead = false;
    this.IsPlayer = true;

    this.Conditions = {};
    this.Damage = function(amt){
        this.CurrHP -= Number(amt);
        return true;
    }
    this.Heal = function(amt){
        this.CurrHP += Number(amt);
        return true;
    }

}