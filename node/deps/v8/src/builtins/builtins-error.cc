// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "src/builtins/accessors.h"
#include "src/builtins/builtins-utils-inl.h"
#include "src/builtins/builtins.h"
#include "src/execution/isolate-inl.h"
#include "src/execution/messages.h"
#include "src/logging/counters.h"
#include "src/objects/api-callbacks.h"
#include "src/objects/objects-inl.h"
#include "src/objects/property-descriptor.h"

namespace v8 {
namespace internal {

// ES6 section 19.5.1.1 Error ( message )
BUILTIN(ErrorConstructor) {
  HandleScope scope(isolate);
  Handle<Object> options = args.atOrUndefined(isolate, 2);
  RETURN_RESULT_OR_FAILURE(
      isolate, ErrorUtils::Construct(isolate, args.target(), args.new_target(),
                                     args.atOrUndefined(isolate, 1), options));
}

// static
BUILTIN(ErrorCaptureStackTrace) {
  HandleScope scope(isolate);
  Handle<Object> object_obj = args.atOrUndefined(isolate, 1);

  isolate->CountUsage(v8::Isolate::kErrorCaptureStackTrace);

  if (!IsJSObject(*object_obj)) {
    THROW_NEW_ERROR_RETURN_FAILURE(
        isolate, NewTypeError(MessageTemplate::kInvalidArgument, object_obj));
  }

  Handle<JSObject> object = Handle<JSObject>::cast(object_obj);
  Handle<Object> caller = args.atOrUndefined(isolate, 2);
  FrameSkipMode mode = IsJSFunction(*caller) ? SKIP_UNTIL_SEEN : SKIP_FIRST;

  // Collect the stack trace and install the stack accessors.
  RETURN_FAILURE_ON_EXCEPTION(
      isolate, ErrorUtils::CaptureStackTrace(isolate, object, mode, caller));
  return ReadOnlyRoots(isolate).undefined_value();
}

// ES6 section 19.5.3.4 Error.prototype.toString ( )
BUILTIN(ErrorPrototypeToString) {
  HandleScope scope(isolate);
  RETURN_RESULT_OR_FAILURE(isolate,
                           ErrorUtils::ToString(isolate, args.receiver()));
}

}  // namespace internal
}  // namespace v8
