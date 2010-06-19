
var CombatantIDCounter = 0;

function Combatant(name, maxhp){
    maxhp = parseInt(maxhp);  // convert a string to an int if necessary

    this.ID = CombatantIDCounter++;
    this.CurrHP = maxhp;
    this.TempHP = 0;
    this.MaxHP = maxhp;
    this.InitiativeRoll = 0;
    this.FailedDeathSaves = 0;
    this.Round = 0;
    this.Name = name;

    this.BloodiedValue = Math.floor(maxhp/2);
    this.Initiative = 0;
    this.IsBloodied = false;
    this.IsDying = false;
    this.IsDead = false;
    this.IsPlayer = true;

    this.Conditions = {};


    this.Damage = function(amt){
        // do not damage if dead
        if (this.IsDead) return false;

        // remove temp hp before damaging
        if(this.TempHP > 0){
            if (this.TempHP > amt) {
                this.TempHP -= amt;
                amt = 0;
            }
            else {
                amt -= this.TempHP;
                this.TempHP = 0;
            }
        }
        
        this.CurrHP -= Number(amt);


        this.SetStatus();
        return true;
    }
    
    this.Heal = function(amt){
        // do not heal if at max hp
        if (this.CurrHP == this.MaxHP) return false;
        amt = parseInt(amt);

        // check if dead
        if (this.IsDead){
            if(!confirm(
                this.Name +" is dead. Healing will bring them back to life. " +
                "Are you sure you want to heal them?")){
                    return false;
            }
        }

        // set hp to 0 before healing
        if (this.CurrHP < 0) this.CurrHP = 0;        
        if (amt+this.CurrHP > this.MaxHP) this.CurrHP = this.MaxHP;
        else this.CurrHP += amt;

        this.SetStatus();
        return true;
    }

    /**
     * Checks the CurrHP of the combatant and sets appropriate flags for
     * IsBloodied, IsDying, and IsDead.
     */
    this.SetStatus = function(){
        // It is assumed that this function will not be called unless there is
        // a change in HP.  If a player is dying and is then stabilized, IsDying
        // can be set to false, but if the player takes more damage they will
        // be dying again (or dead).

        this.IsDead = false;
        this.IsDying = false;
        this.IsBloodied = false;

        if (this.CurrHP <= this.BloodiedValue){
            this.IsBloodied = true;
        }

        if (this.CurrHP <= 0){
            if (this.IsPlayer && this.CurrHP > -(this.BloodiedValue) && this.FailedDeathSaves < 3){
                this.IsDying = true;
            }else{
                this.IsDead = true;
            }
        }        
    }

    this.HPString = function(){
        var hpstring = "";
        hpstring += this.CurrHP;
        if (this.TempHP > 0) hpstring += "+" + this.TempHP;
        return hpstring;
    }

    this.AddTempHP = function(amt){
        amt = parseInt(amt);
        if (amt > this.TempHP){
            this.TempHP = amt;            
            return true;
        } 
        return false;
    }
    
}