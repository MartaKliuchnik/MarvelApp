{
  'variables': {
    'openssl_defines_darwin-i386-cc': [
      'NDEBUG',
      'L_ENDIAN',
      'OPENSSL_BUILDING_OPENSSL',
      'AES_ASM',
      'CMLL_ASM',
      'DES_ASM',
      'ECP_NISTZ256_ASM',
      'GHASH_ASM',
      'MD5_ASM',
      'OPENSSL_BN_ASM_GF2m',
      'OPENSSL_BN_ASM_MONT',
      'OPENSSL_BN_ASM_PART_WORDS',
      'OPENSSL_CPUID_OBJ',
      'OPENSSL_IA32_SSE2',
      'PADLOCK_ASM',
      'POLY1305_ASM',
      'RC4_ASM',
      'RMD160_ASM',
      'SHA1_ASM',
      'SHA256_ASM',
      'SHA512_ASM',
      'VPAES_ASM',
      'WHIRLPOOL_ASM',
      'OPENSSL_PIC',
    ],
    'openssl_cflags_darwin-i386-cc': [
      '-Wa,--noexecstack',
      '-O3 -fomit-frame-pointer',
      '-arch i386',
      '-O3 -fomit-frame-pointer',
    ],
    'openssl_ex_libs_darwin-i386-cc': [
      '',
    ],
    'openssl_cli_srcs_darwin-i386-cc': [
      'openssl/apps/lib/cmp_mock_srv.c',
      'openssl/apps/asn1parse.c',
      'openssl/apps/ca.c',
      'openssl/apps/ciphers.c',
      'openssl/apps/cmp.c',
      'openssl/apps/cms.c',
      'openssl/apps/crl.c',
      'openssl/apps/crl2pkcs7.c',
      'openssl/apps/dgst.c',
      'openssl/apps/dhparam.c',
      'openssl/apps/dsa.c',
      'openssl/apps/dsaparam.c',
      'openssl/apps/ec.c',
      'openssl/apps/ecparam.c',
      'openssl/apps/enc.c',
      'openssl/apps/engine.c',
      'openssl/apps/errstr.c',
      'openssl/apps/fipsinstall.c',
      'openssl/apps/gendsa.c',
      'openssl/apps/genpkey.c',
      'openssl/apps/genrsa.c',
      'openssl/apps/info.c',
      'openssl/apps/kdf.c',
      'openssl/apps/list.c',
      'openssl/apps/mac.c',
      'openssl/apps/nseq.c',
      'openssl/apps/ocsp.c',
      'openssl/apps/openssl.c',
      'openssl/apps/passwd.c',
      'openssl/apps/pkcs12.c',
      'openssl/apps/pkcs7.c',
      'openssl/apps/pkcs8.c',
      'openssl/apps/pkey.c',
      'openssl/apps/pkeyparam.c',
      'openssl/apps/pkeyutl.c',
      'openssl/apps/prime.c',
      './config/archs/darwin-i386-cc/asm/apps/progs.c',
      'openssl/apps/rand.c',
      'openssl/apps/rehash.c',
      'openssl/apps/req.c',
      'openssl/apps/rsa.c',
      'openssl/apps/rsautl.c',
      'openssl/apps/s_client.c',
      'openssl/apps/s_server.c',
      'openssl/apps/s_time.c',
      'openssl/apps/sess_id.c',
      'openssl/apps/smime.c',
      'openssl/apps/speed.c',
      'openssl/apps/spkac.c',
      'openssl/apps/srp.c',
      'openssl/apps/storeutl.c',
      'openssl/apps/ts.c',
      'openssl/apps/verify.c',
      'openssl/apps/version.c',
      'openssl/apps/x509.c',
      'openssl/apps/lib/app_libctx.c',
      'openssl/apps/lib/app_params.c',
      'openssl/apps/lib/app_provider.c',
      'openssl/apps/lib/app_rand.c',
      'openssl/apps/lib/app_x509.c',
      'openssl/apps/lib/apps.c',
      'openssl/apps/lib/apps_ui.c',
      'openssl/apps/lib/columns.c',
      'openssl/apps/lib/engine.c',
      'openssl/apps/lib/engine_loader.c',
      'openssl/apps/lib/fmt.c',
      'openssl/apps/lib/http_server.c',
      'openssl/apps/lib/names.c',
      'openssl/apps/lib/opt.c',
      'openssl/apps/lib/s_cb.c',
      'openssl/apps/lib/s_socket.c',
      'openssl/apps/lib/tlssrp_depr.c',
    ],
  },
  'defines': ['<@(openssl_defines_darwin-i386-cc)'],
  'include_dirs': [
    './include',
  ],
  'cflags' : ['<@(openssl_cflags_darwin-i386-cc)'],
  'libraries': ['<@(openssl_ex_libs_darwin-i386-cc)'],
  'sources': ['<@(openssl_cli_srcs_darwin-i386-cc)'],
}
