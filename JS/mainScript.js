const character_input = document.getElementById("character-select");

const character_name_display        = document.getElementById("character-name");
const character_type_display        = document.getElementById("character-type");
const character_image_display       = document.getElementById("character_image");
const character_health_display      = document.getElementById("character-health");
const character_damage_display      = document.getElementById("character-damage");
const character_speed_display       = document.getElementById("character-speed");
const character_armor_display       = document.getElementById("character-armor");

const site_items = document.getElementById("site_items");
const player_items = document.getElementById("player_items");

////////////////////////////////////////////////////////////////////

character_input.onchange = outputStats;

////////////////////////////////////////////////////////////////////

generateItems();

function generateItems() {
    for(i = 0; i < items.length; i++) {
          const new_item = document.createElement("div");
                new_item.classList.add("draggable-item");
                new_item.draggable = true;
          
          const new_item_image = document.createElement("img");
                new_item_image.classList.add("item");
                new_item_image.classList.add(items[i].itemRarity);
                new_item_image.classList.add(items[i].itemID);
                new_item_image.src = "itemIcons/" + items[i].itemRarity + "/" + items[i].itemIcon;

          site_items.appendChild(new_item);
          new_item.appendChild(new_item_image);
    }
}

////////////////////////////////////////////////////////////////////

const draggable_item = document.querySelectorAll(".draggable-item");
const item_lists = document.querySelectorAll(".item-list");

console.log(draggable_item.length);

draggable_item.forEach(item => {

      item.addEventListener("dragstart", () => {
            item.classList.add("moving")
      })

      item.addEventListener("dragend", () => {
            item.classList.remove("moving")
      })
})

item_lists.forEach(item_list => {
      item_list.addEventListener("dragover", e => {
            e.preventDefault()
            const moving_item = document.querySelector(".moving")
            item_list.appendChild(moving_item)
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

function outputStats() {

      let CharacterID = getCharacterID()

      character_name_display.innerText    = CharacterID.name;
      character_type_display.innerText    = CharacterID.type;
      character_image_display.src         = "characterIcons/" + CharacterID.name + ".png" //I have to do this monstrosity be cause just CharacterID would use the object, not the ID/word itself
      character_health_display.innerHTML  = "Health: " + CharacterID.health;
      character_damage_display.innerText  = "Damage: " + JSON.stringify(CharacterID.damage);
      character_speed_display.innerText   = "Speed: " + JSON.stringify(CharacterID.movement_speed) + " m/s";
      character_armor_display.innerText   = "Armor: " + JSON.stringify(CharacterID.armor);
}

////////////////////////////////////////////////////////////////////

function updateStats() {


      character_type_display.innerText    = CharacterID.type;
      character_health_display.innerHTML  = "Health: " + (CharacterID.health + 1);
      character_damage_display.innerText  = "Damage: " + (CharacterID.damage + 1);
      character_speed_display.innerText   = "Speed: " +  (CharacterID.movement_speed + 1); + " m/s";
      character_armor_display.innerText   = "Armor: " + (CharacterID.armor + 1);
}

player_items.onchange = updateStats();
