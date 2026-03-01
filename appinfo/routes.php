<?php

declare(strict_types=1);

$requirements = [
	'apiVersion' => 'v1',
];

return [
	'routes' => [
		['name' => 'stickersApi#getSticker', 'url' => '/s/{stickerId}', 'verb' => 'GET'],
		['name' => 'stickersApi#getStickerLegacy', 'url' => '/sticker/{stickerId}/{fileName}', 'verb' => 'GET'],
	],
	'ocs' => [
		['name' => 'stickersApi#listStickers', 'url' => '/api/{apiVersion}/stickers', 'verb' => 'GET', 'requirements' => $requirements],
	],
];
