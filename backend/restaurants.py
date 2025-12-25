"""
Restaurant data for multiple malls
Format: [Restaurant Name, Unit Number, Floor, Category]
"""

# Restaurant data organized by mall
MALL_RESTAURANTS = {
    "sunway_square": [
    ["103 Coffee", "L1-07", "L1", "Coffee & Cafes"],
    ["A'Decade", "L2-22", "L2", "Local & Malaysian"],
    ["Armoury Steakhouse", "LG-05", "LG", "Western & International"],
    ["BESTORE", "L1-39", "L1", "Snacks & Specialty Store"],
    ["Black Canyon", "L1-40", "L1", "Western & International"],
    ["Ba Shu Jia Yan", "LG-09 & LG-10", "LG", "Chinese & Taiwanese"],
    ["Beutea", "LG1-02", "LG1", "Tea & Beverages"],
    ["Bread History", "LG1-25", "LG1", "Bakery & Pastry"],
    ["Chagee", "L1-04", "L1", "Tea & Beverages"],
    ["Coffee Bean", "L1-31", "L1", "Coffee & Cafes"],
    ["Christine's Bakery Cafe", "L1-42", "L1", "Bakery & Pastry"],
    ["CHUCHAT", "L1-06", "L1", "Tea & Beverages"],
    ["ChaPanda", "L2-01", "L2", "Tea & Beverages"],
    ["CU Mart", "L2-28", "L2", "Korean & Convenience"],
    ["Come Buy Yakiniku", "LG-01", "LG", "Japanese Cuisine"],
    ["Count (Flower Drum)", "LG-06 & LG-07", "LG", "Chinese & Taiwanese"],
    ["Chatramue", "LG1-18", "LG1", "Tea & Beverages"],
    ["DOZO", "L1-41", "L1", "Japanese Cuisine"],
    ["Empire Sushi", "LG1-22", "LG1", "Japanese Cuisine"],
    ["Far Coffee", "L2-18A", "L2", "Coffee & Cafes"],
    ["Fong Woh Tong", "LG1-23", "LG1", "Chinese & Taiwanese"],
    ["Gong Luck Cafe", "L1-30", "L1", "Local & Malaysian"],
    ["Gokoku Japanese Bakery", "L1-44", "L1", "Bakery & Pastry"],
    ["Gong Cha", "L2-02", "L2", "Tea & Beverages"],
    ["Hock Kee Kopitiam", "L1-43", "L1", "Local & Malaysian"],
    ["Han Bun Sik", "L2-12", "L2", "Korean Cuisine"],
    ["Happy Potato", "L2-04", "L2", "Snacks & Desserts"],
    ["I'm Bagel", "L2-29", "L2", "Western & International"],
    ["I LIKE & Yogurt In A Can", "L2-03", "L2", "Snacks & Desserts"],
    ["JP & CO", "L1-45", "L1", "Western & International"],
    ["Kanteen", "L1-08", "L1", "Local & Malaysian"],
    ["Kenangan Coffee", "L2-08", "L2", "Coffee & Cafes"],
    ["Kedai Kopi Malaya", "LG1-20", "LG1", "Local & Malaysian"],
    ["Kha Coffee Roaster", "LG1-14", "LG1", "Coffee & Cafes"],
    ["LLAO LLAO", "L1-14", "L1", "Snacks & Desserts"],
    ["Luckin", "L1-05", "L1", "Coffee & Cafes"],
    ["Manjoe", "L1-17", "L1", "Chinese & Taiwanese"],
    ["Mix.Store", "LG-04", "LG", "Snacks & Specialty Store"],
    ["Mr. Wu", "LG-11", "LG", "Chinese & Taiwanese"],
    ["Missy Sushi", "LG-06", "LG", "Japanese Cuisine"],
    ["Nasi Lemak Shop", "LG1-16", "LG1", "Local & Malaysian"],
    ["Nine Dragon Char Chan Teng (Kowloon Cafe)", "LG1-13", "LG1", "Chinese & Taiwanese"],
    ["Nippon Sushi", "LG1-01", "LG1", "Japanese Cuisine"],
    ["Odon Beyond", "L1-03", "L1", "Japanese Cuisine"],
    ["One Dish One Taste", "LG1-12B", "LG1", "Chinese & Taiwanese"],
    ["Pak Curry", "LG1-26", "LG1", "Local & Malaysian"],
    ["Ramen Mob", "L1-12", "L1", "Japanese Cuisine"],
    ["Richeese Factory", "LG1-15", "LG1", "Fast Food"],
    ["Sweetie", "LG1-24", "LG1", "Snacks & Desserts"],
    ["Salad Atelier", "L1-01", "L1", "Western & International"],
    ["Super Matcha", "L1-20", "L1", "Tea & Beverages"],
    ["Shabuyaki by Nippon Sushi", "LG-12 & LG-13", "LG", "Japanese Cuisine"],
    ["Stuff'D", "LG1-27", "LG1", "Western & International"],
    ["Subway", "LG1-21", "LG1", "Fast Food"],
    ["The Public House", "L1-09", "L1", "Western & International"],
    ["Tealive Plus", "L2-30", "L2", "Tea & Beverages"],
    ["Tang Gui Fei Tanghulu", "L2-17", "L2", "Snacks & Desserts"],
    ["The Walking Hotpot Signature", "L2-23", "L2", "Chinese & Taiwanese"],
    ["The Chicken Rice Shop", "LG1-10", "LG1", "Local & Malaysian"],
    ["Village Grocer", "LG1-05 to LG1-09", "LG1", "Supermarket"],
    ["Yellow Bento", "L2-01", "L2", "Japanese Cuisine"],
    ["Yonny", "L1-32", "L1", "Chinese & Taiwanese"],
    ["Yama by Hojichaya", "L2-10A", "L2", "Japanese Cuisine"],
    ["Yogurt Planet", "LG1-19", "LG1", "Snacks & Desserts"],
    ["Zus Coffee", "L1-02", "L1", "Coffee & Cafes"],
    ["Zok Noodle House", "L2-24", "L2", "Chinese & Taiwanese"],
    ],
    
    # Add more malls here in the future
    # "another_mall": [
    #     ["Restaurant Name", "Unit", "Floor", "Category"],
    #     ...
    # ],
}

# Mall metadata
MALL_INFO = {
    "sunway_square": {
        "name": "Sunway Square",
        "display_name": "Sunway Square Mall"
    },
    # Add more mall info here
    # "another_mall": {
    #     "name": "Another Mall",
    #     "display_name": "Another Mall Name"
    # },
}

def get_logo_path(restaurant_name, mall_id="sunway_square"):
    """
    Generate logo file path from restaurant name.
    Maps restaurant names to logo file names in frontend/public/images/logo/
    """
    # Mapping of restaurant names to their logo file names
    # Based on the actual files in frontend/public/images/logo/
    logo_mapping = {
        "103 Coffee": "103-coffee.png",
        "A'Decade": "a'decade.png",
        "Armoury Steakhouse": "armoury-steakhouse.png",
        "BESTORE": "bestore.png",
        "Black Canyon": "black-canyon.png",
        "Ba Shu Jia Yan": "ba-shu-jia-yan.png",
        "Beutea": "beutea.png",
        "Bread History": "bread-history.png",
        "Chagee": "chagee.png",
        "Coffee Bean": "coffee-bean.png",
        "Christine's Bakery Cafe": "christine's-bakery-cafe.png",
        "CHUCHAT": "chuchat.png",
        "ChaPanda": "chapanda.png",
        "CU Mart": "cumart.png",
        "Come Buy Yakiniku": "come-buy-yakiniku.png",
        "Count (Flower Drum)": "count(flower-drum).png",
        "Chatramue": "chatramue.png",
        "DOZO": "dozo.png",
        "Empire Sushi": "empire-sushi.png",
        "Far Coffee": "far-coffee.png",
        "Fong Woh Tong": "fong-woh-tong.png",
        "Gong Luck Cafe": "gong-luck-cafe.png",
        "Gokoku Japanese Bakery": "gokoku-japanese-bakery.png",
        "Gong Cha": "gong-cha.png",
        "Hock Kee Kopitiam": "hock-kee-kopitiam.png",
        "Han Bun Sik": "han-bun-sik.png",
        "Happy Potato": "happy-potato.png",
        "I'm Bagel": "i'm-bagel.png",
        "I LIKE & Yogurt In A Can": "i-like-&-yogurt-in-a-can.png",
        "JP & CO": "jp-&-co.png",
        "Kanteen": "kanteen.png",
        "Kenangan Coffee": "kenangan-coffee.png",
        "Kedai Kopi Malaya": "kedai-kopi-malaya.png",
        "Kha Coffee Roaster": "kha-coffee-roaster.png",
        "LLAO LLAO": "llao-llao.png",
        "Luckin": "luckin.png",
        "Manjoe": "manjoe.png",
        "Mix.Store": "mix.store.png",
        "Mr. Wu": "mr.wu.png",
        "Missy Sushi": "missy-sushi.jpeg",
        "Nasi Lemak Shop": "nasi-lemak-shop.png",
        "Nine Dragon Char Chan Teng (Kowloon Cafe)": "nine-dragon-char-chan-teng-(kowloon-cafe).png",
        "Nippon Sushi": "nippon-sushi.png",
        "Odon Beyond": "odon-beyond.png",
        "One Dish One Taste": "one-dish-one-taste.png",
        "Pak Curry": "pak-curry.png",
        "Ramen Mob": "ramen-mob.png",
        "Richeese Factory": "richeese-factory.png",
        "Sweetie": "sweetie.jpg",
        "Salad Atelier": "salad-atelier.png",
        "Super Matcha": "super-matcha.png",
        "Shabuyaki by Nippon Sushi": "shabuyaki-by-nippon-sushi.png",
        "Stuff'D": "stuff'd.png",
        "Subway": "subway.png",
        "The Public House": "the-public-house.png",
        "Tealive Plus": "tealive-plus.png",
        "Tang Gui Fei Tanghulu": "tang-gui-fei-tanghulu.png",
        "The Walking Hotpot Signature": "the-walking-hotpot-signature.png",
        "The Chicken Rice Shop": "the-chicken-rice-shop.png",
        "Village Grocer": "village-grocer.png",
        "Yellow Bento": "yellow-bento.jpeg",
        "Yonny": "yonny.png",
        "Yama by Hojichaya": "yama-by-hojichaya.png",
        "Yogurt Planet": "yogurt-planet.png",
        "Zus Coffee": "zus-coffee.png",
        "Zok Noodle House": "zok-noodle-house.png",
    }
    
    logo_filename = logo_mapping.get(restaurant_name)
    if logo_filename:
        return f"images/logo/{logo_filename}"
    return None

def get_available_malls():
    """Get list of available mall IDs"""
    return list(MALL_RESTAURANTS.keys())

def get_mall_info(mall_id):
    """Get mall information"""
    return MALL_INFO.get(mall_id, {"name": mall_id, "display_name": mall_id})

def get_restaurants_by_mall(mall_id):
    """Get all restaurants for a specific mall"""
    return MALL_RESTAURANTS.get(mall_id, [])

def get_restaurants_by_categories(categories, mall_id="sunway_square"):
    """Get all restaurants that match the given categories for a specific mall"""
    restaurants = get_restaurants_by_mall(mall_id)
    matching_restaurants = []
    for restaurant in restaurants:
        name, unit, floor, category = restaurant
        if category in categories:
            logo_path = get_logo_path(name, mall_id)
            matching_restaurants.append({
                "name": name,
                "unit": unit,
                "floor": floor,
                "category": category,
                "logo": logo_path
            })
    return matching_restaurants

def get_all_categories(mall_id="sunway_square"):
    """Get all unique categories for a specific mall"""
    restaurants = get_restaurants_by_mall(mall_id)
    categories = set()
    for restaurant in restaurants:
        categories.add(restaurant[3])  # Category is at index 3
    return sorted(list(categories))

def get_restaurant_by_name(name, mall_id="sunway_square"):
    """Get restaurant details by name for a specific mall"""
    restaurants = get_restaurants_by_mall(mall_id)
    for restaurant in restaurants:
        if restaurant[0] == name:
            logo_path = get_logo_path(name, mall_id)
            return {
                "name": restaurant[0],
                "unit": restaurant[1],
                "floor": restaurant[2],
                "category": restaurant[3],
                "logo": logo_path
            }
    return None

