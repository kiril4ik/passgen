<?php
header('Content-Type: application/json');
// Generate and output a cryptographically secure salt (32 bytes, 64-character salt)
echo json_encode([ 'salt' => bin2hex(random_bytes(32)) ]);
