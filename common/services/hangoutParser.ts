import * as _ from 'lodash';

export default function processDataLodash(Hangouts) {
	let Conversations = {};
	let all_participants = {};
	let key = '';
	let person_key = '';
	let event_key = '';
	// const commonWords =['je', 'tu', 'il', 'nous', 'vous', 'ils', 'on', 'elle','j', 'mais', 'ou', 'est', 'donc', 'or', 'ni', 'car', 'de', 'dans', 'ta', 'le', 'la', 'a', 'pas', 'd', 'c', 'un', 'une', 'et', 'mon', 'ma','que', 'les', 'en','ca'];
	const commonWords = [''];
	const stats = {};
	const start = Date.now();
		// First we want to get all participants, so we loop fully once
		const start2 = Date.now();
		for(key in Hangouts['conversation_state']) {
			var conversation = Hangouts['conversation_state'][key]['conversation_state']['conversation'];
			// Get all participants
			_.map(conversation['participant_data'], person => {
        var gaia_id = person['id']['gaia_id'];
        if(!person['fallback_name'] || person['fallback_name'] == null) return;
        if(!all_participants[gaia_id])
          all_participants[gaia_id] = person['fallback_name'];
          stats[all_participants[gaia_id]] = {
            messages: 0,
            characters: 0,
            images: 0,
            words: 0,
            diffWord: {}
          };
      })
		}
    console.log((Date.now()-start2) / 1000);
    _.map(Hangouts['conversation_state'], conversation_state => {
			var id = conversation_state['conversation_id']['id'];
			var conversation = conversation_state['conversation_state']['conversation'];
			// Find participants
			var participants = [], participants_obj = {};
      _.map(conversation['participant_data'], person => {
				var gaia_id = person['id']['gaia_id'];
				var name = "Unknown";
				if(person['fallback_name']){
					name = person['fallback_name'];
				}else{
					name = all_participants[gaia_id];
				}
				participants.push(name);
				participants_obj[gaia_id] = name;
			})
			var participants_string = participants.join(", ");
			// Add to list
			// $(".convo-list").append("<a href=\"javascript:void(0);\" onclick=\"switchConvo('"+id+"')\" class=\"list-group-item\">" + participants_string + "</a>");
			// Parse events
			var events = [];
      _.map(conversation_state['conversation_state']['event'], convo_event => {
				var sender = convo_event['sender_id']['gaia_id'];
				// var message = "";
				// var timestamp = convo_event['timestamp'];
				if(convo_event['chat_message']){
					// Get message
					_.map(convo_event['chat_message']['message_content']['segment'], segment => {
						if(!segment['text']) return;
						let words = _.words(segment['text']);

						if(stats[participants_obj[sender]]) {
							words.forEach(word => {
								let w = _.lowerCase(word);
								if(!_.includes(commonWords,w)){
									if(stats[participants_obj[sender]].diffWord[w]){
										stats[participants_obj[sender]].diffWord[w].count ++;
									}else{
										stats[participants_obj[sender]].diffWord[w]= {
											word: w,
											count: 1
										};
									}
								}
							});
							stats[participants_obj[sender]].characters += segment['text'].length;
							stats[participants_obj[sender]].words +=words.length;
						}
						// message += segment['text'];
					})
					// Check for images on event
					if(convo_event['chat_message']['message_content']['attachment']){
						for(var attach_key in convo_event['chat_message']['message_content']['attachment']){
							// var attachment = convo_event['chat_message']['message_content']['attachment'][attach_key];
							if(stats[participants_obj[sender]]) {
								stats[participants_obj[sender]].images = stats[participants_obj[sender]].images + 1;
							}
							// if(attachment['embed_item']['type'][0] == "PLUS_PHOTO"){
							// 	message += "\n<a target='blank' href='" + attachment['embed_item']['embeds.PlusPhoto.plus_photo']['url'] + "'><img class='thumb' src='" + attachment['embed_item']['embeds.PlusPhoto.plus_photo']['thumbnail']['image_url'] + "' /></a>";
							// }
						}
					}
					if(stats[participants_obj[sender]]) {
						stats[participants_obj[sender]].messages = stats[participants_obj[sender]].messages + 1;
					}
					// events.push({sender: participants_obj[sender], message: message, timestamp: timestamp});
				}
			})

			// Sort events by timestamp
			// events.sort(function(a, b){
			// 	var keyA = a.timestamp,
			// 	    keyB = b.timestamp;
			// 	if(keyA < keyB) return -1;
			// 	if(keyA > keyB) return 1;
			// 	return 0;
			// });
			// Add events
			Conversations[id] = events;
		});
		const data = [];
		let user = '';
    const start3 = Date.now();
		for(user in stats) {
			data.push({
				name: user,
				wordCount: _.size(stats[user].diffWord),
				data: [stats[user].messages, stats[user].characters, stats[user].images, _.take(_.orderBy(_.values(stats[user].diffWord),['count'],['desc']), 100)]
			});
		}
    console.log('loop stats', (Date.now()-start3) / 1000);
		const end = Date.now();
		console.log((end-start)/1000, 'secondes');
    return data;
	}
