var ConditionIDCounter = 0;

function Condition(){

    this.ID = ConditionIDCounter++;

    this.Value = 0;
    this.EndsOnTurn = 0;
    this.SaveEnds = false;
    this.EndsOnBegining = true;
    this.Name = "";

    this.Aftereffect = null;

}