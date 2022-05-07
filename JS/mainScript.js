const character_input = document.getElementById("character-select");

const character_name_display        = document.getElementById("character-name");
const character_type_display        = document.getElementById("character-type");
const character_image_display       = document.getElementById("character_image");
const character_health_display      = document.getElementById("character-health");
const character_damage_display      = document.getElementById("character-damage");
const character_speed_display       = document.getElementById("character-speed");
const character_armor_display       = document.getElementById("character-armor");

////////////////////////////////////////////////////////////////////

character_input.onchange = defaultStats;

////////////////////////////////////////////////////////////////////

var healthModifier = 1;

function defaultModifiers() {
    healthModifier = 1;
}

defaultModifiers();

////////////////////////////////////////////////////////////////////

const site_items = document.getElementById("site_items");

generateItems();

function generateItems() {
    for(i = 0; i < items.length; i++) {
            const new_item = document.createElement("div");
                new_item.classList.add("draggable-item");
                new_item.setAttribute("id", items[i].itemID);
          
            const new_item_image = document.createElement("img");
                new_item_image.classList.add("item");
                new_item_image.classList.add(items[i].itemRarity);
                new_item_image.classList.add(items[i].itemID);
                new_item_image.src = "itemIcons/" + items[i].itemRarity + "/" + items[i].itemIcon;

            const new_number_input_div = document.createElement("div");
                new_number_input_div.classList.add("item-amount-input-div");

            const new_number_input = document.createElement("input");
                new_number_input.type = "number";  
                new_number_input.setAttribute("id", items[i].itemID + "-item-amount");
                new_number_input.classList.add("item-amount-input");
                new_number_input.setAttribute("min", "1");
                new_number_input.setAttribute("value", "1");
                

        site_items.appendChild(new_item);
        new_item.appendChild(new_item_image);
        new_item.appendChild(new_number_input_div);
        new_number_input_div.appendChild(new_number_input);
    }
}

////////////////////////////////////////////////////////////////////

const draggable_item = document.querySelectorAll(".draggable-item");
const item_lists = document.querySelectorAll(".item-list");

draggable_item.forEach(item => {

      item.addEventListener("dragstart", () => {
            item.classList.add("moving");
      })

      item.addEventListener("dragend", () => {
            item.classList.remove("moving");
            itemDetection();
      })
})

item_lists.forEach(item_list => {
      item_list.addEventListener("dragover", e => {
            e.preventDefault();
            const moving_item = document.querySelector(".moving");
            item_list.appendChild(moving_item);
      })
})

////////////////////////////////////////////////////////////////////

function getCharacterID() {

      let selected_character = character_input.options[character_input.selectedIndex].id;
      
      switch(selected_character) {
            case "commando":        return commando;       break;
            case "huntress":        return huntress;       break;
            case "bandit":          return bandit;         break;
            case "mult":            return mult;           break;
            case "engineer":        return engineer;       break;
            case "artificer":       return artificer;      break;
            case "mercenary":       return mercenary;      break;
            case "rex":             return rex;            break;
            case "loader":          return loader;         break;
            case "acrid":           return acrid;          break;
            case "captain":         return captain;        break;
            case "railgunner":      return railgunner;     break;
            case "voidfiend":       return voidfiend;      break;
            case "heretic":         return heretic;        break;
            case "mithrix":         return mithrix;        break;
            case "scavenger":       return scavenger;      break;

            default: console.log("unknown-character");
      }

}

function defaultStats() {

      let CharacterID = getCharacterID();

      character_name_display.innerText    = CharacterID.name;
      character_type_display.innerText    = CharacterID.type;
      character_image_display.src         = "characterIcons/" + CharacterID.name + ".png" //I have to do this monstrosity be cause just CharacterID would use the object, not the ID/word itself
      character_health_display.innerHTML  = CharacterID.health;
      character_damage_display.innerText  = "Damage: " + JSON.stringify(CharacterID.damage);
      character_speed_display.innerText   = "Speed: " + JSON.stringify(CharacterID.movement_speed) + " m/s";
      character_armor_display.innerText   = "Armor: " + JSON.stringify(CharacterID.armor);
}

////////////////////////////////////////////////////////////////////

function itemDetection() {
    
    defaultStats()

    const player_items = document.getElementById("player_items");
    const items_in_inventory = player_items.querySelectorAll(".draggable-item");

    console.clear();

    defaultModifiers();

    items_in_inventory.forEach(item => {

        switch(item.id) {
            case "debug":   console.log("debug");   break;

            case "repulsion_armor_plate":   
                console.log(findItem(item.id));
                healthModifier = healthModifier * document.getElementById(item.id + "-item-amount").value;   
            break;
            
            case "mocha":                   
                console.log(findItem(item.id));
                healthModifier++;   
            break;

            case "topaz_brooch":            
                console.log(findItem(item.id));   
            break;

            case "tougher_times":           
                console.log(findItem(item.id));   
            break;

            case "tri_tip_dagger":          
                console.log(findItem(item.id));   
            break;

            case "armor_piercing_rounds":   
                console.log(findItem(item.id));   
            break;

            case "lens_makers_glasses":     
                console.log(findItem(item.id));   
            break;

            case "crowbar":                 
                console.log(findItem(item.id));   
            break;

            case "bundle_of_fireworks":     
                console.log(findItem(item.id));   
            break;

            case "bison_steak":             
                console.log(findItem(item.id));   
            break;

            case "delicate_watch":          
                console.log(findItem(item.id));   
            break;

            case "roll_of_pennies":         
                console.log(findItem(item.id));   
            break;

            case "cautious_slug":           
                console.log(findItem(item.id));   
            break;

            case "power_elixir":            
                console.log(findItem(item.id));   
            break;

            default: console.log("Unknown Item");
        }
    })
    
    updateStats();
}

function findItem(itemID) {
    for(i = 0; i < items.length; i++) {
        if(items[i].itemID == itemID) {
            return items[i].itemName;
        }
    }
}

function updateStats() {

    let CharacterID = getCharacterID();

    console.log(healthModifier);

    character_health_display.innerHTML  = CharacterID.health * healthModifier;
    
    character_damage_display.innerText  = "Damage: " + JSON.stringify(CharacterID.damage);
    character_speed_display.innerText   = "Speed: " + JSON.stringify(CharacterID.movement_speed) + " m/s";
    character_armor_display.innerText   = "Armor: " + JSON.stringify(CharacterID.armor);
}
